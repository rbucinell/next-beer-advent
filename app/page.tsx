"use client";

import { useState, useEffect } from "react";
import { IEvent } from "@/app/models/event";
import { IParticipant } from "@/app/models/participant";
import { Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ParticipantItem from "@/components/ParticipantItem";
import { Get } from "./util/RequestHelper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {

  const [advent, setAdvent] = useState<IEvent>();
  const [participants, setParticipants] = useState<IParticipant[]>([]);

  useEffect(() => {
    (async () => {
      setAdvent( await Get<IEvent>('api/event'));
      setParticipants( await Get<IParticipant[]>('api/participant'));
    })();
  }, [] );

  return (
    <div className='p-2 max-w-3xl mx-auto'>
      {/* <Typography variant="h4" sx={{ m: 1 }}>
        { advent ? advent.name : "Beer Advent"}
      </Typography> */}
      <Stack spacing={1}>
        { participants ? 
          participants.map( (participant) =>
          (
            <ParticipantItem key={participant._id.toString()} {...participant}/>
          ) )
          : (<Item> Loading Participants </Item>)
        }
    </Stack>
    </div>
  );
}
