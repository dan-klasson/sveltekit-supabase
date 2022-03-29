<script lang="ts">
  import { Container, Button, TextField, Row, Col, Card, Icon } from "svelte-materialify";
  import { mdiEmail, mdiLock } from "@mdi/js";
  import supabase from "$lib/db";
  import { alerts } from "$lib/stores";

  let loading: boolean = false;
  let email: string, password: string, confirmpassword: string;

  const handleSignup = async () => {
    if (password != confirmpassword) {
      $alerts = [
        ...$alerts,
        { type: "error", message: "Password and Confirm Password fields do not match" }
      ];
      return;
    }

    loading = true;
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      $alerts = [...$alerts, { type: "error", message: error.message }];
    } else {
      const message = "We have sent you an confirmation email. Please check your email";
      $alerts = [...$alerts, { type: "success", message }];
    }
    loading = false;
  };
</script>

<div class="grid place-items-center h-screen">
  <Card class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12">
    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800, mb-4">Signup</h2>

    <form class="mt-10" on:submit|preventDefault={handleSignup}>
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
          >
            <div slot="prepend">
              <Icon path={mdiLock} />
            </div>
          </TextField>
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField
            solo
            placeholder="Confirm Password"
            bind:value={confirmpassword}
            type="password"
            name="confirmpassword"
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
            {loading ? "Loading" : "Signup"}
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
          <a href="/auth/login" class="underline flex justify-end"> Login </a>
        </Col>
      </Row>
    </Container>
  </Card>
</div>
