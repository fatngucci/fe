/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import Header from "../Header"
import { act } from "react-dom/test-utils";
import React from "react";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import Footer from "../Footer";


test('header is displayed correctlty', async () => {

    await act(async () => {
        await render(
            <MemoryRouter initialEntries={['/']}>
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                </Routes>
                <Footer />
            </MemoryRouter>
        )
    })

    expect(screen.getByTestId('galerien-btn')).toBeInTheDocument();
    expect(screen.getByTestId('kunstwerke-btn')).toBeInTheDocument();
    // expect(screen.getByTestId('künstler-btn')).toBeInTheDocument();
    expect(screen.getByTestId('news-btn')).toBeInTheDocument();

    // expect(screen.getByTestId('person-btn')).toBeInTheDocument();
    // expect(screen.getByTestId('heart-btn')).toBeInTheDocument();
    // expect(screen.getByTestId('cart-btn')).toBeInTheDocument();
})