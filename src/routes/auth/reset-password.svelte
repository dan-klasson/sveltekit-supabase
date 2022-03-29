<script lang="ts">
  import { Container, Button, TextField, Row, Col, Card, Icon } from "svelte-materialify";
  import { mdiEmail } from "@mdi/js";
  import supabase from "$lib/db";
  import { alerts } from "$lib/stores";

  let email: string;
  let loading: boolean = false;

  export const handleResetPassword = async () => {
    loading = true;
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);

    if (error) {
      $alerts = [...$alerts, { type: "error", message: error.message }];
    } else {
      const message = "Password reset email sent";
      $alerts = [...$alerts, { type: "success", message }];
    }
    loading = false;
  };
</script>

<div class="grid place-items-center h-screen">
  <Card class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12">
    <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800, mb-4">Login</h2>

    <form class="mt-10" on:submit|preventDefault={handleResetPassword}>
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
          <Button block type="submit" class="bg-gray-300 hover:bg-gray-400">
            {loading ? "Loading" : "Reset password"}
          </Button>
        </Col>
      </Row>
    </form>

    <Container>
      <Row>
        <Col>
          <a href="/auth/login" class="underline"> Login </a>
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
