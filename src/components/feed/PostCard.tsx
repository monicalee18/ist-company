import Link from "next/link";

interface PostCardProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export default function PostCard({
  id,
  author,
  content,
  createdAt,
  likes,
  comments,
}: PostCardProps) {
  return (
    <article className="border-b border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/50">
      <div className="flex gap-3">
        {/* Avatar */}
        <Link href={`/user/${author.username}`} className="shrink-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 sm:h-12 sm:w-12" />
        </Link>

        <div className="flex-1 min-w-0">
          {/* Author Info */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/user/${author.username}`}
              className="font-semibold text-zinc-900 hover:underline dark:text-white"
            >
              {author.name}
            </Link>
            <Link
              href={`/user/${author.username}`}
              className="text-sm text-zinc-500 dark:text-zinc-400"
            >
              @{author.username}
            </Link>
            <span className="text-sm text-zinc-400 dark:text-zinc-500">·</span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {createdAt}
            </span>
          </div>

          {/* Content */}
          <Link href={`/post/${id}`}>
            <p className="mt-2 whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
              {content}
            </p>
          </Link>

          {/* Actions */}
          <div className="mt-3 flex items-center gap-6">
            <button className="flex items-center gap-2 text-zinc-500 transition-colors hover:text-red-500 dark:text-zinc-400">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-sm">{likes}</span>
            </button>
            <button className="flex items-center gap-2 text-zinc-500 transition-colors hover:text-blue-500 dark:text-zinc-400">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-sm">{comments}</span>
            </button>
            <button className="flex items-center gap-2 text-zinc-500 transition-colors hover:text-green-500 dark:text-zinc-400">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
