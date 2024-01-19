import React, { useState } from "react";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import ShowEvents from "./ShowEvents";

const MainMenu = () => {
    const [date, setDate] = useState<Date>(new Date());
    const router = useRouter();
    return (
        <Container>
            <h1>Eventos</h1>
            <Menu>
                <Button
                    onClick={() => {
                        const newDate = new Date(date);
                        newDate.setDate(newDate.getDate() - 1);
                        setDate(newDate);
                    }}
                >
                    Día anterior
                </Button>
                <Button
                    onClick={() => {
                        const newDate = new Date(date);
                        newDate.setDate(newDate.getDate() + 1);
                        setDate(newDate);
                    }}
                >
                    Día siguiente
                </Button>
                <Button onClick={() => router.push("/addEvent")}>
                    {" "}
                    Añadir evento
                </Button>
            </Menu>
            <ShowEvents date={date} key={date.toISOString()} />
        </Container>
    );
};

const Button = styled.button`
  border: 1px solid;
  border-color: black;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  padding: 15px;
  font-size: 18px;
  color: #424242;
  &:hover {
    background-color: #e0e0ea;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default MainMenu;