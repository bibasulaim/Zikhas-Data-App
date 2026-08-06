import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main
        style={{
          flex: 1,
          background: "#f8fafc",
          padding: "30px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
