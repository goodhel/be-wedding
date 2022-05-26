import mariadb from 'mariadb'
import config from '../config/app.config.json'
const pool = mariadb.createPool(config.db)

class _database {
    /**
     * Escape undefined in args as null. Preventing query execution from throwing error
     * @param {string[]} args - arguments to be passed into query 
     * @returns {string[]} escaped args
     */
    escapeUndefined = (args: any): string[] => {
        if (!(args instanceof Object)) {
          return args === undefined ? null : args
        }
    
        for (const key in args) {
          if (args[key] === undefined) {
            args[key] = null
          }
        }
    
        return args
    }

    /**
     * Execute query with arguments
     * @param sql - sql query
     * @param params - escaped arguments to be passed into query (avoiding injection)
     * @param stripMeta - if false query will return meta
     * @param insertIdAsNumber - if false insertId will be returned as BigInt
     * @returns sql query result
     */
    query = async (sql: string, params: (string | number | null | undefined)[], stripMeta = true, insertIdAsNumber = true) => {
        let conn
        try {
            conn = await pool.getConnection()
            const res = await conn.query({sql, insertIdAsNumber}, this.escapeUndefined(params))

            if (Array.isArray(res) && res.length === 0) {
                return { code: 'EMPTY_RESULT'}
            } else {
                if (stripMeta) {
                    delete res.meta
                }

                return res
            }
        } finally {
            if (conn) {
                conn.release()
            }
        }
    }
}

export default new _database()