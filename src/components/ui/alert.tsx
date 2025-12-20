"use client";

import Swal, { SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/src/sweetalert2.scss";

const ReactSwal = withReactContent(Swal);

type SweetAlertProps = SweetAlertOptions & { darkMode?: boolean }


export const Alert = ({ darkMode = true, ...options }: SweetAlertProps) => {
    ReactSwal.fire({
        ...options,
        iconHtml: options.iconHtml,
        showConfirmButton: options.showConfirmButton ?? true,
        background: darkMode ? "#1c1c1e" : "#fff",
        color: darkMode ? "#f9fafb" : "#111827",
        confirmButtonColor: darkMode ? "#4f46e5" : "#6366f1",
        customClass: {
        popup: "rounded-2xl shadow-lg p-6 text-center",
        title: "text-xl font-semibold mb-2",
        htmlContainer: "text-sm mb-4",
        confirmButton: "px-6 py-2 rounded-lg font-semibold",
        },
        ...options,
    });
};
