import React, { FC, useState } from "react";
import { styled } from "styled-components";

type ParticipantsComponentProps = {
    participants: string[];
    onChange: (participants: string[]) => void;
};

const AddParticipants: FC<ParticipantsComponentProps> = ({
    participants,
    onChange,
}) => {
    const [newParticipant, setNewParticipant] = useState<string>("");

    return (
        <Participants>
            <Seccion>Participantes:</Seccion>
            <div>
                {participants.map((participant) => (
                    <li key={participant}>{participant}</li>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Nuevo participante"
                    value={newParticipant}
                    onChange={(e) => {
                        setNewParticipant(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        onChange([...participants, newParticipant]);
                        setNewParticipant("");
                    }}
                >
                    Añadir participante
                </button>
            </div>
        </Participants>
    );
};

const Participants = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
  button {
    margin: 10px;
  }
`;

const Seccion = styled.h3`
    margin: 5px;
`

export default AddParticipants;
