import { table } from '@devvai/devv-code-backend';

/**
 * Database utility functions for common CRUD operations
 */

/**
 * Serialize data for database storage (arrays and objects to JSON strings)
 */
const serializeData = (data: Record<string, any>): Record<string, any> => {
    const serialized: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value) || (typeof value === 'object' && value !== null && !(value instanceof Date))) {
            serialized[key] = JSON.stringify(value);
        } else {
            serialized[key] = value;
        }
    }
    return serialized;
};

/**
 * Deserialize data from database (JSON strings back to arrays/objects)
 */
const deserializeData = (data: Record<string, any>): Record<string, any> => {
    const deserialized: Record<string, any> = { ...data };
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
            try {
                deserialized[key] = JSON.parse(value);
            } catch {
                // Keep as string if JSON parsing fails
            }
        }
    }
    return deserialized;
};

/**
 * Add item to database table
 * @param tableId - Table ID from table_list
 * @param userId - User ID from auth
 * @param data - Item data to add
 */
export const addItem = async (tableId: string, userId: string, data: Record<string, any>) => {
    try {
        const serializedData = serializeData(data);
        await table.addItem(tableId, {
            _uid: userId,
            ...serializedData,
        });
        return { success: true, data: serializedData };
    } catch (error: any) {
        console.error('Add item error:', error);
        return { success: false, error: error.message || 'Failed to add item' };
    }
};

/**
 * Get items from database table
 * @param tableId - Table ID from table_list
 * @param options - Query options (filters, pagination, etc.)
 */
export const getItems = async (
    tableId: string,
    options?: {
        limit?: number;
        cursor?: string;
        sort?: string;
        order?: 'asc' | 'desc';
        query?: Record<string, any>;
    }
) => {
    try {
        const result = await table.getItems(tableId, options);
        const deserializedItems = result.items.map(deserializeData);
        return { success: true, data: deserializedItems, nextCursor: result.nextCursor };
    } catch (error: any) {
        console.error('Get items error:', error);
        return { success: false, error: error.message || 'Failed to get items' };
    }
};

/**
 * Update item in database table
 * @param tableId - Table ID from table_list
 * @param userId - User ID (primary key)
 * @param itemId - Item ID (primary key)
 * @param updates - Fields to update
 */
export const updateItem = async (
    tableId: string,
    userId: string,
    itemId: string,
    updates: Record<string, any>
) => {
    try {
        const serializedUpdates = serializeData(updates);
        await table.updateItem(tableId, {
            _uid: userId,
            _id: itemId,
            ...serializedUpdates,
        });
        return { success: true, data: serializedUpdates };
    } catch (error: any) {
        console.error('Update item error:', error);
        return { success: false, error: error.message || 'Failed to update item' };
    }
};

/**
 * Delete item from database table
 * @param tableId - Table ID from table_list
 * @param userId - User ID (primary key)
 * @param itemId - Item ID (primary key)
 */
export const deleteItem = async (tableId: string, userId: string, itemId: string) => {
    try {
        const result = await table.deleteItem(tableId, {
            _uid: userId,
            _id: itemId,
        });
        return { success: true, data: result };
    } catch (error: any) {
        console.error('Delete item error:', error);
        return { success: false, error: error.message || 'Failed to delete item' };
    }
};

/**
 * Query items with conditions (max 2 parameters)
 * @param tableId - Table ID from table_list
 * @param conditions - Query conditions (max 2 fields)
 * @param options - Additional query options
 */
export const queryItems = async (
    tableId: string,
    conditions: Record<string, any>,
    options?: {
        limit?: number;
        cursor?: string;
        sort?: string;
        order?: 'asc' | 'desc';
    }
) => {
    try {
        const result = await table.getItems(tableId, {
            query: conditions,
            ...options,
        });
        const deserializedItems = result.items.map(deserializeData);
        return { success: true, data: deserializedItems, nextCursor: result.nextCursor };
    } catch (error: any) {
        console.error('Query items error:', error);
        return { success: false, error: error.message || 'Failed to query items' };
    }
};

/**
 * Direct database operations for forum feature
 */

// Helper function to get table ID by name
const TABLE_IDS: Record<string, string> = {
    forum_posts: 'f3hk428wt24h',
    forum_replies: 'f3hk428wt24g',
};

export const dbInsert = async <T = any>(tableName: string, data: Record<string, any>): Promise<T> => {
    const tableId = TABLE_IDS[tableName];
    if (!tableId) throw new Error(`Table ${tableName} not found`);

    const serializedData = serializeData(data);
    await table.addItem(tableId, serializedData);
    // Return the data with a temporary ID
    return { ...data, _id: `temp_${Date.now()}` } as T;
};

export const dbQuery = async <T = any>(
    tableName: string,
    conditions: Record<string, any> = {}
): Promise<T[]> => {
    const tableId = TABLE_IDS[tableName];
    if (!tableId) throw new Error(`Table ${tableName} not found`);

    const result = await table.getItems(tableId, {
        query: Object.keys(conditions).length > 0 ? conditions : undefined,
        limit: 1000,
    });

    return result.items.map(deserializeData) as T[];
};

export const dbUpdate = async (
    tableName: string,
    itemId: string,
    updates: Record<string, any>
): Promise<any> => {
    const tableId = TABLE_IDS[tableName];
    if (!tableId) throw new Error(`Table ${tableName} not found`);

    const serializedUpdates = serializeData(updates);
    await table.updateItem(tableId, {
        _id: itemId,
        ...serializedUpdates,
    });

    return updates;
};
