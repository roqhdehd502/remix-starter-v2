import { useCallback } from 'react';

export { meta } from './server';

export default function Index() {
  const backToPage = useCallback(() => {
    history.back();
  }, []);

  return (
    <section className="p-4 text-center">
      <h1 className="text-6xl">detail</h1>
      <button onClick={backToPage}>back</button>
    </section>
  );
}
