import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites, getHistory } from '@/lib/userData';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';

export default function Login() {
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setWarning(null);

    try {
      const success = await authenticateUser(userName, password);
      if (success) {
        await updateAtoms();
        router.push("/favourites");
      }
    } catch (err) {
        console.error(" Login error:", err.message);
      setWarning(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={isSubmitting}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
        </Form.Group>
        <br />
        {warning && <Alert variant="danger">{warning}</Alert>}
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </>
  );
}
