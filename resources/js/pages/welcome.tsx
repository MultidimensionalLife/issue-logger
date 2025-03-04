import { type GithubIssues } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { issues } = usePage<GithubIssues>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <table className="w-full text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Issue Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Body
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">View</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map((row, index) => {
                        return (
                            <tr
                                key={`${row.id}-${index}`}
                                className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                            >
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    {row.number}
                                </th>
                                <td className="px-6 py-4">{row.title}</td>
                                <td className="px-6 py-4">{new Date(row.created_at).toDateString()}</td>
                                <td className="px-6 py-4">{row.body}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                        View
                                        {/* TODO */}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
