import { render, screen, act } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import '@testing-library/jest-dom';
import Card from "../Card";
import Header from "../Header";
import Footer from "../Footer";


test('footer is displayed correctlty', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/kunstwerke']}>
                <Header />
                <Routes>
                    {/* <Route path='/kunstwerke' element={<Card kunstwerkResource={cardData} />} /> */}
                </Routes>
                <Footer />
            </MemoryRouter>
        )
    })

    // expect(screen.getByText(/Flow/i)).toBeInTheDocument();
    // expect(screen.getByText(/Maria Orlova/i)).toBeInTheDocument();
    // expect(screen.getByText(/€ 350,00/i)).toBeInTheDocument();
    // expect(screen.getByText(/Verkauft/i)).toBeInTheDocument();

    // expect(screen.getByTestId("heart-unfilled")).toBeInTheDocument();
    // fireEvent.click(screen.getByTestId("heart-unfilled"));
    // expect(screen.getByTestId("heart-filled")).toBeInTheDocument();
})