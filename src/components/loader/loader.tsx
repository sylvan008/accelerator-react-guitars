import './styles.css';

type PropsType = {
  className?: string,
};

function Loader(props: PropsType): JSX.Element {
  const {className} = props;
  const classes = ['loader', className ? className : '']
    .join(' ')
    .trim();
  return (
    <section className={classes}>
      <p className="visually-hidden">Загрузка...</p>
      <svg>
        <use xlinkHref="#loader-dot" />
      </svg>
    </section>
  );
}

export default Loader;
