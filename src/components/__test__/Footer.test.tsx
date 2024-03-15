/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import Footer from "../Footer";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "../Header";
import HomePage from "../../pages/HomePage";


test('footer is displayed correctlty', async () => {
    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                </Routes>
                <Footer />
            </MemoryRouter>
        )
    })

    expect(screen.getByText(/Kontakt/i)).toBeInTheDocument();
    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument();
    expect(screen.getByText(/Newsletter/i)).toBeInTheDocument();

    expect(screen.getByTestId("linkedin-btn")).toBeInTheDocument();
    expect(screen.getByTestId("facebook-btn")).toBeInTheDocument();
    expect(screen.getByTestId("twitter-btn")).toBeInTheDocument();
    expect(screen.getByTestId("instagram-btn")).toBeInTheDocument();
})