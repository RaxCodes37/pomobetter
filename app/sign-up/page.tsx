import { signUpAction } from "../api/auth";
export const instant = false;

export default function SignUp() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-xl bg-[#363434] p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Sign up</h1>
        <p className="mt-1 text-sm text-gray-400">
          Create an account to get started.
        </p>

        <form action={signUpAction} className="mt-3 space-y-5">
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your Name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none"
          />

          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none"
          />

          <div>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign in
          </a>
        </p>
      </section>
    </main>
  );
}
