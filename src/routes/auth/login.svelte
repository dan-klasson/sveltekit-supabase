<script lang="ts">
  import { Container, Button, TextField, Row, Col, Card, Icon } from "svelte-materialify";
  import { mdiEmail, mdiLock } from "@mdi/js";
  import supabase from "$lib/db";
  import { alerts, user } from "$lib/stores";

  let loading: boolean = false;
  let email: string, password: string;

  const handleLogin = async () => {
    loading = true;
    const { user: auth, error } = await supabase.auth.signIn({ email, password });

    if (error) {
      $alerts = [...$alerts, { type: "error", message: error.message }];
    } else {
      $user = auth;
      const message = "Successfully logged in";
      $alerts = [...$alerts, { type: "success", message }];
    }
    loading = false;
  };
</script>

<div class="grid place-items-center h-screen">
  <Card class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12">
    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800, mb-4">Login</h2>

    <form class="mt-10" on:submit|preventDefault={handleLogin}>
      <Row>
        <Col>
          <TextField
            solo
            placeholder="Email"
            bind:value={email}
            type="email"
            name="email"
            autocomplete="email"
          >
            <div slot="prepend">
              <Icon path={mdiEmail} />
            </div>
          </TextField>
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField
            solo
            placeholder="Password"
            bind:value={password}
            type="password"
            name="password"
            autocomplete="password"
          >
            <div slot="prepend">
              <Icon path={mdiLock} />
            </div>
          </TextField>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button block type="submit" class="bg-gray-300 hover:bg-gray-400">
            {loading ? "Loading" : "Login"}
          </Button>
        </Col>
      </Row>
    </form>

    <Container>
      <Row>
        <Col>
          <a href="/auth/reset-password" class="underline"> Forgot password? </a>
        </Col>
        <Col>
          <p class="text-gray-500 text-md text-center">or</p>
        </Col>
        <Col>
          <a href="/auth/signup" class="underline flex justify-end"> Create an Account </a>
        </Col>
      </Row>
    </Container>
  </Card>
</div>
