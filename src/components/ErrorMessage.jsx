export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="mx-auto my-16 max-w-md rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 text-2xl">
        ⚠️
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-red-300">
        Oops! Something went wrong
      </h3>
      <p className="mt-2 text-sm text-red-200/80">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold active:scale-95"
        >
          Try Again
        </button>
      )}
    </div>
  );
}