type PropsType = {
  iconName: 'icon-full-star' | 'icon-star',
}

function IconRating(props: PropsType): JSX.Element {
  const {iconName} = props;
  return (
    <svg width="12" height="11" aria-hidden="true">
      <use xlinkHref={`#${iconName}`}/>
    </svg>
  );
}

export default IconRating;
