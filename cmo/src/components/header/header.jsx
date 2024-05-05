import './styles.css';

function Header(props) {
    return (
      <header>
        <div className="container">
          <div className="site-name">
            <h1>| {props.marca} |</h1>
          </div>
          <nav>
            <ul>
              <li><a href="#inicio">Início</a></li>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li style={{ marginRight: '50px' }}><a href="#entre_em_contato">Contato</a></li>                
            </ul>
          </nav>
        </div>
      </header>
    );
  }

export default Header;