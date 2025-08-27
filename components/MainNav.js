

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { readToken, removeToken } from '@/lib/authenticate';
import { addToHistory } from '@/lib/userData';


export default function MainNav() {
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  const token = readToken(); 

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = `title=true&q=${searchField.trim()}`;

    if (searchField.trim() !== '') {
      const updatedHistory = await addToHistory(query);
      setSearchHistory(updatedHistory);
      router.push(`/artwork?${query}`);
      setSearchField('');
      setIsExpanded(false);
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        expanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        className="fixed-top"
        style={{ backgroundColor: '#2C3E50' }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand className="fw-bold">ArtExplore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === '/'}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>

              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>

            {token && (
              <>
                <Form className="d-flex" onSubmit={handleSubmit}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button
                    type="submit"
                    style={{ backgroundColor: '#1ABC9C', borderColor: '#1ABC9C' }}
                  >
                    Search
                  </Button>
                </Form>

                &nbsp;

                <Nav>
                  <NavDropdown title={`Welcome ${token.userName}`} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                        Favourites
                      </NavDropdown.Item>
                    </Link>

                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                        Search History
                      </NavDropdown.Item>
                    </Link>

                    <NavDropdown.Divider />

                    <NavDropdown.Item onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            )}

            {!token && (
              <Nav className="ms-auto">
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === '/register'}
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>

                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === '/login'}
                    onClick={() => setIsExpanded(false)}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}


