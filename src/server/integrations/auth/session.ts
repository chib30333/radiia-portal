export async function getServerSession() {
  return {
    user: null,
    organization: null
  };
}
