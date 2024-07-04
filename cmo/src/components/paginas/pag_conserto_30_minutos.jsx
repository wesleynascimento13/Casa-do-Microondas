import React from 'react';
import { logout } from '../../utils/loginout';
import '../../styles/styles.css';


function Conserto30Minutos(props) {
    return (
      <div className="conserto-em-30-min-container centralizado">
      <h2 className="conserto-em-30-min-title">Para conserto em trinta minutos</h2>
      <p className="conserto-em-30-min-text">Informamos aos nossos clientes que orçamento e conserto em 30 minutos serão realizados desde que:</p>
      <ul className="conserto-em-30-min-list">
        <li className="conserto-em-30-min-list-item">
          <span className="conserto-em-30-min-important">Cliente aguarde no balcão;</span> A preferência será de quem estiver aguardando.
        </li>
        <li className="conserto-em-30-min-list-item">
          <span className="conserto-em-30-min-important">Não seja aparelho importado;</span> pois pode haver dificuldade em encontrar peças ou fazer adaptações.
        </li>
        <li className="conserto-em-30-min-list-item">
          <span className="conserto-em-30-min-important">Não tenha vindo de outra oficina;</span> pois algumas vezes vem todo mexido, faltando peças ou com a fiação trocada.
        </li>
        <li className="conserto-em-30-min-list-item">
          <span className="conserto-em-30-min-important">Seja dentro do horário que o técnico está trabalhando;</span> (08:30h às 11:30h e 13h às 16:30h) Após este horário será orçado e consertado no dia seguinte.
        </li>
        <li className="conserto-em-30-min-list-item">
          <span className="conserto-em-30-min-important">Não necessite de pintura ou de retoque de pintura;</span> nesse caso precisa-se de até 15 dias para ficar pronto.
        </li>
        <li className="conserto-em-30-min-list-item">
          <span className="conserto-em-30-min-important">Não serão avaliados na hora os micro-ondas de Convecção, Fornos Elétricos Fischer Lumen, Fornos Elétricos de Embutir 60L de qualquer marca, máquinas de pão ou qualquer outro aparelho que o técnico julgar necessário mais tempo para avaliação.</span>
        </li>
        <li className="conserto-em-30-min-list-item">
          <span className="conserto-em-30-min-important">Dentro dos 30 minutos está incluso a limpeza e higienização.</span> Mas caso o aparelho esteja muito engordurado, com pó incrustado ou precise de cuidados extras (polimento, tirar manchas, limpeza dos dutos) pode demorar um pouco mais.
        </li>
      </ul>
      <p className="conserto-em-30-min-text">Contamos com sua compreensão.</p>
      <p className="conserto-em-30-min-footer">Casa do Microondas</p>

      <button
      onClick={logout}
      style={{
        backgroundColor: 'orangered',
        borderRadius: '5px',
        padding: '14px 28px',
        border: 'none',
        cursor: 'pointer',
        color: 'white',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '14px'
      }}
    >
      Logout
    </button>

    </div>
      
      
      
    );
}

export default Conserto30Minutos;