import React from "react";

interface AdminIDContextType {
    adminID: string|undefined;
    setAdminID: (adminID: string|undefined) => void
}

export const AdminIDContext = React.createContext<AdminIDContextType>({} as AdminIDContextType);

export const useAdminIDContext = () => React.useContext(AdminIDContext);