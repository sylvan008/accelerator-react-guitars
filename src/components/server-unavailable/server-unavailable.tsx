function ServerUnavailable(): JSX.Element {
  return (
    <section className="server-unavailable">
      <h1 className="server-unavailable__title">Сервер временно недоступен</h1>
      <p className="server-unavailable__description">
        Пожалуйста попробуйте обратиться позже.
      </p>
    </section>
  );
}

export default ServerUnavailable;
