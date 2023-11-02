interface Props {
  title: string;
  name?: string;
}

const Template = ({ title, name }: Props) => {
  return (
    <div className="mt-4">
      <h1 className="text-3xl font-bold underline">{title}</h1>
      <div className="flex justify-center gap-2">
        <button className="primary">{name}</button>
        <button className="secondary">{name}</button>
        <button className="info">{name}</button>
        <button className="warning">{name}</button>
        <button className="inherit">{name}</button>
        <button className="success">{name}</button>
        <button className="danger">{name}</button>
      </div>
    </div>
  );
};

export default Template;
