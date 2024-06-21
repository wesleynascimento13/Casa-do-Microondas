import { useMemo, useState } from 'react';
import api from '../../api/api'
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fakeData, usStates } from './makeData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Servico = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'titulo',
        header: 'Título',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.titulo,
          helperText: validationErrors?.titulo,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              titulo: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'descricao',
        header: 'Descrição',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.descricao,
          helperText: validationErrors?.descricao,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              descricao: undefined,
            }),
        },
      },
      {
        accessorKey: 'imagem',
        header: 'Imagem',
        muiEditTextFieldProps: {
          required: false,
          error: !!validationErrors?.imagem,
          helperText: validationErrors?.imagem,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              imagem: undefined,
            }),
        },
      },
      {
        accessorKey: 'url',
        header: 'Página',
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.url,
          helperText: validationErrors?.url,
        },
      },

      {
        accessorKey: 'ordem',
        header: 'Ordem',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.ordem,
          helperText: validationErrors?.ordem,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              ordem: undefined,
            }),
        },
      },

      {
        accessorKey: 'ativo',
        header: 'Ativo',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.ativo,
          helperText: validationErrors?.ativo,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              ativo: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createServico, isPending: isCreatingServico } =
    useCreateServico();
  //call READ hook
  const {
    data: fetchedServicos = [],
    isError: isLoadingServicosError,
    isFetching: isFetchingServicos,
    isLoading: isLoadingServicos,
  } = useGetServicos();
  //call UPDATE hook
  const { mutateAsync: updateServico, isPending: isUpdatingServicos } =
    useUpdateServico();
  //call DELETE hook
  const { mutateAsync: deleteServico, isPending: isDeletingServico } =
    useDeleteServico();

  //CREATE action
  const handleCreateServico = async ({ values, table }) => {
    const newValidationErrors = validateServico(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createServico(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveServico = async ({ values, table }) => {
    const newValidationErrors = validateServico(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateServico(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Tem certeza que quer desativar este serviço??')) {
      deleteServico(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedServicos,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingServicosError
      ? {
          color: 'error',
          children: 'Erro na leitura dos dados.',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateServico,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveServico,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Criar novo serviço</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edição de serviço</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Desativar">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Novo
      </Button>
    ),
    state: {
      isLoading: isLoadingServicos,
      isSaving: isCreatingServico || isUpdatingServicos || isDeletingServico,
      showAlertBanner: isLoadingServicosError,
      showProgressBars: isFetchingServicos,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new servico to api)
function useCreateServico() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (servico) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newServicoInfo) => {
      queryClient.setQueryData(['servicos'], (prevServicos) => [
        ...prevServicos,
        {
          ...newServicoInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get servicos from api)
function useGetServicos() {
    return api.get('/servicos');
    // Função assíncrona pode ser usada para chamadas de API falsas
    // const fetchServicos = async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 1000)); // chamada de API falsa
    //   return Promise.resolve(fakeData);
    // };
    
    // Opções de consulta podem ser adicionadas conforme necessário
    // return useQuery({
    //   queryKey: ['servicos'],
    //   queryFn: fetchServicos,
    //   refetchOnWindowFocus: false,
    // });
  }

//UPDATE hook (put servico in api)
function useUpdateServico() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (servico) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newServicoInfo) => {
      queryClient.setQueryData(['servicos'], (prevServicos) =>
        prevServicos?.map((prevServico) =>
          prevServicos.id === newServicoInfo.id ? newServicoInfo : prevServico,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete servico in api)
function useDeleteServico() {
//   return useMutation({
//     mutationFn: async (Id) => {
//       //send api update request here
//       await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//       return Promise.resolve();
//     },
//     //client side optimistic update
//     onMutate: (Id) => {

//         api.delete('/servicos/;'),
     
//         prevServicos?.filter((servico) => servico.id !== Id),
//       );
//     },
//     // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//   });
}



const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
 // <QueryClientProvider client={queryClient}>
    <Example />
//  </QueryClientProvider>
);

export default ExampleWithProviders;

function validateervico(servico) {
  return {
    titulo: !validateRequired(servico.titulo)
      ? 'Título é obrigatório'
      : '',
    descricao: !validateRequired(servico.descricao) ? 'Descrição é obrigatória' : '',
    ordem: !validateRequired(servico.ordem) ? 'Ordem é obrigatório' : '',
  };
}
