import Link from 'next/link.js';
import styled from 'styled-components';
import Form from '../components/Form.js';
import { StyledLink } from '../components/StyledLink.js';
import useSWR from "swr";
import { useRouter } from 'next/router.js';


const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const places = useSWR("/api/places")
  const router = useRouter()
  async function addPlace(event) {
    event.preventDefault();
   
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    const response = await fetch("/api/places", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // onSubmit(data);
    console.log(response);
    
    if (response.ok) {
     
      await response.json();
      
      places.mutate();
      router.push("/")
      
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addPlace} formName={'add-place'} />
    </>
  );
  
}