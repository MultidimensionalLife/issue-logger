<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    private function get_current_github_username(): string
    {
        $output = $this->curl_github('https://api.github.com/user');

        return $output->login;
    }
    private function get_issues()
    {
        $username = $this->get_current_github_username();

        return $this->curl_github('https://api.github.com/repos/'.$username.'/sample-issues/issues?assignee='.$username.'&state=open');
    }

    private function curl_github($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('User-Agent: sample-issue', 'Authorization: token '.env('GITHUB_PERSONAL_TOKEN')));


        $output = curl_exec($ch);

        curl_close($ch);

        return json_decode($output);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'issues' => $this->get_issues()
        ];
    }
}
