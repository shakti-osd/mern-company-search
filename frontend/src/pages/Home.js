import React from 'react';
import Search from "../components/Search";
import Service from "../components/Service";
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Container style={{padding:0}}>
    <Search />
    <Service />
    </Container>
  )
}
