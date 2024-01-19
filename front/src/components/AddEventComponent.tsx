import React, { useState } from "react";
import { useRouter } from "next/router";
import { styled } from "styled-components";
import { Event } from "@/styles/types";
import AddParticipants from "./AddParticipants";

const AddEventComponent = () => {
    const router = useRouter();
    const [event, setEvent] = useState<Omit<Event, "id">>({
        title: "",
        date: new Date(),
        init: new Date().getHours(),
        end: new Date().getHours() + 1,
        participants: [],
    });

    const addEvent = async (event: Omit<Event, "id">) => {
        const response = await fetch(
            `http://localhost:4000/addEvent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            }
        );

        if (response.status === 200) {
            router.push("/");
        } else {
            const data = await response.json();
            alert(`Error: ${data.message}`);
        }
    };

    return (
        <EventForm>
            <h1>Añadir Evento</h1>
            <div>
                <button onClick={() => addEvent(event)}>Añadir</button>
                <button onClick={() => router.push("/")}>Volver</button>
            </div>
            <input
                type="text"
                placeholder="Título"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
            />
            <input
                type="date"
                value={event.date.toISOString().split("T")[0]}
                onChange={(e) => setEvent({ ...event, date: new Date(e.target.value) })}
            />
            <Imputs>
                <Text>Hora de inicio: </Text>
                <input
                    placeholder="Hora de inicio"
                    type="number"
                    value={event.init}
                    onChange={(e) =>
                        setEvent({ ...event, init: parseInt(e.target.value) })
                    }
                />
            </Imputs>
            <Imputs>
                <Text>Hora de finalización:</Text>
                <input
                    placeholder="Hora de finalización"
                    type="number"
                    value={event.end}
                    onChange={(e) =>
                        setEvent({ ...event, end: parseInt(e.target.value) })
                    }
                />
            </Imputs>
            <AddParticipants
                participants={event.participants}
                onChange={(participants) => setEvent({ ...event, participants })}
            />
        </EventForm>
    );
};

const EventForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-radius: 16px;
  background-color: #c3c0c0;
  max-width: 400px;
  margin: 0 auto;
  & > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1rem;
  }
  & > input {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const Text = styled.div`
  width: 150px;
  font-style: italic;
`;

const Imputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  max-width: 300px;
`;

export default AddEventComponent;
