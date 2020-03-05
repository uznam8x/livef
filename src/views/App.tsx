import React from 'react';
import Stage from "../components/Stage";

function App() {
  return (
    <div className="container-fluid full-screen">
      <header className="toolbar"></header>
      <main className="row">
        <aside id="components" className="col-2"></aside>
        <section className="col p-0">
          <Stage />
        </section>
        <aside id="status" className="col-2"></aside>
      </main>
    </div>
  );
}

export default App;
