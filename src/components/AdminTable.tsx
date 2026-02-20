import { useState, useRef, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface AdminTableProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminTable({ children, className }: AdminTableProps) {
  const { user, isImpersonating, realUser } = useAuth();
  const isAdmin = isImpersonating ? realUser?.role === "admin" : user?.role === "admin";
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // Column resize
  const handleColResizeStart = useCallback((e: React.MouseEvent, colIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    const table = tableRef.current;
    if (!table) return;
    const allCells = table.querySelectorAll(`tr > *:nth-child(${colIndex + 1})`);
    const startX = e.clientX;
    const startWidth = (allCells[0] as HTMLElement)?.offsetWidth || 100;

    const onMove = (ev: MouseEvent) => {
      const newWidth = Math.max(40, startWidth + ev.clientX - startX);
      allCells.forEach((cell) => {
        (cell as HTMLElement).style.width = `${newWidth}px`;
        (cell as HTMLElement).style.minWidth = `${newWidth}px`;
      });
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, []);

  // Row resize
  const handleRowResizeStart = useCallback((e: React.MouseEvent, rowEl: HTMLElement) => {
    e.preventDefault();
    e.stopPropagation();
    const startY = e.clientY;
    const startHeight = rowEl.offsetHeight;

    const onMove = (ev: MouseEvent) => {
      const newHeight = Math.max(28, startHeight + ev.clientY - startY);
      rowEl.style.height = `${newHeight}px`;
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, []);

  // After render, inject resize handles for admin
  const injectHandles = useCallback((el: HTMLTableElement | null) => {
    (tableRef as React.MutableRefObject<HTMLTableElement | null>).current = el;
    if (!el) return;

    // Remove old handles
    el.querySelectorAll(".col-resize-handle, .row-resize-handle").forEach((h) => h.remove());

    // Column handles on header cells
    const headerCells = el.querySelectorAll("thead th, thead td, tbody tr:first-child > *");
    headerCells.forEach((cell, i) => {
      const handle = document.createElement("div");
      handle.className = "col-resize-handle";
      handle.addEventListener("mousedown", (e) => {
        handleColResizeStart(e as unknown as React.MouseEvent, i);
      });
      (cell as HTMLElement).style.position = "relative";
      cell.appendChild(handle);
    });

    // Row handles on all rows
    const rows = el.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const handle = document.createElement("div");
      handle.className = "row-resize-handle";
      handle.addEventListener("mousedown", (e) => {
        handleRowResizeStart(e as unknown as React.MouseEvent, row as HTMLElement);
      });
      (row as HTMLElement).style.position = "relative";
      row.appendChild(handle);
    });
  }, [handleColResizeStart, handleRowResizeStart]);

  // Row click handler for selection
  const handleTableClick = useCallback((e: React.MouseEvent) => {
    if (!isAdmin) return;
    const target = e.target as HTMLElement;
    const row = target.closest("tr");
    if (!row) return;
    const table = row.closest("table");
    if (!table) return;
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    const idx = rows.indexOf(row);

    // Clear all selected
    rows.forEach((r) => r.classList.remove("row-selected"));

    if (idx >= 0) {
      if (selectedRow === idx) {
        setSelectedRow(null);
      } else {
        row.classList.add("row-selected");
        setSelectedRow(idx);
      }
    }
  }, [isAdmin, selectedRow]);

  return (
    <Table
      className={cn("admin-table", className)}
      ref={injectHandles}
      onClick={handleTableClick}
    >
      {children}
    </Table>
  );
}
