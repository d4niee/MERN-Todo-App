export interface Todo {
    // Object id from mongo stored in string
    userId: string;
    description: string;
    priority: "high" | "medium" | "low";
    completed: boolean
    /**
     * not every time required
     */
    _id?: string
}