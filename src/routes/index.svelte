<script lang="ts">
  import supabase from "$lib/db";
  import { user } from "$lib/stores";

  export const redirect = () => {
    return {
      headers: { Location: "/auth/login" },
      status: 302
    };
  };
  // const user = supabase.auth.user();
  // console.log(user);
  // const session = supabase.auth.session();
  // console.log(session);

  user.set(supabase.auth.user());
  supabase.auth.onAuthStateChange((_, session) => {
    console.log("onAuthChange");
    user.set(session.user);
  });
  console.log($user);
</script>

{#if $user}
  logged in
{:else}
  not logged in
{/if}
