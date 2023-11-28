export interface FastifyUpdateOptions {
    /**
     * The secret required to use the route
     */
    secret: string;

    /**
     * The path to the script that handles the update
     */
    scriptPath: string;

    /**
     * Defaults to /trigger-update
     */
    routeName?: string;
}