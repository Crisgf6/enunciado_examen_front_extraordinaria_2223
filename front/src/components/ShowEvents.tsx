import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Event } from "@/styles/types";
import EventComponent from "./EventComponent";

type EventsProps = {
    date: Date;
};

const ShowEvents = (props: EventsProps) => {

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetchEvents(new Date(props.date));
    }, [props.date]);

    const fetchEvents = async (date: Date) => {
        const response = await fetch(
            `http://localhost:4000/events?date=${date.toISOString()}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.status === 200) {
            const data: Event[] = await response.json();
            setEvents(data);
        }
    };

    const deleteEvent = async (id: string) => {
        const response = await fetch(
            `http://localhost:4000/deleteEvent/${id}`,
            {
                method: "DELETE",
            }
        );
        if (response.status === 200) {
            fetchEvents(new Date(props.date));
        } else {
            const data = await response.json();
            alert(`Error: ${data.message}`);
        }
    };

    return (
        <div>
            <Menu>
                <h1>
                    Día: {" "}
                    {props.date.toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </h1>
                {events.length === 0 && (<h2>No hay eventos</h2>)}
                <Eventos>
                    {events.map((event) => (
                        <Event key={event.id}>
                            <EventComponent event={event} />
                            <button onClick={() => deleteEvent(event.id)}>Borrar</button>
                        </Event>
                    ))}
                </Eventos>
            </Menu>
        </div>
    );
};

const Event = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px;
  border: 1px solid black;
  padding: 10px;
  width: 300px;
  background-color: #f8f8f8;
  box-shadow: 5px 5px 5px #888888;
`;

const Eventos = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`
const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default ShowEvents;
