import { BrowserRouter, Routes, Route } from "react-router-dom";

import PassBookEntry from "./PassBookEntry.jsx";
import Rduser from "./rduser.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Rduser />}
                />

                <Route
                    path="/user/:id"
                    element={<PassBookEntry />}
                />

            </Routes>
        </BrowserRouter>
    );
}