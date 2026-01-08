/**
 * SawitDB - Database Pertanian Kedaulatan Data
 * 
 * Sintaks pertanian untuk pengelolaan data:
 * - LAHAN [table]           → CREATE TABLE
 * - TANAM KE [table] BIBIT (...) → INSERT
 * - PANEN DARI [table]      → SELECT ALL
 * - PANEN DARI [table] DIMANA [key]=[value] → SELECT WHERE
 * - GUSUR DARI [table]      → DELETE ALL
 * - PUPUK [table]           → Randomly corrupt data (Easter egg)
 */

const fs = require('fs');
const path = require('path');

// Check if running in serverless environment
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

class SawitDB {
    constructor(dbPath) {
        this.initialDbPath = dbPath;

        // In serverless, use /tmp directory which is writable
        if (isServerless) {
            this.dbPath = '/tmp/database.sawit';

            // COPY initial data to /tmp if it doesn't exist yet
            if (!fs.existsSync(this.dbPath) && fs.existsSync(this.initialDbPath)) {
                try {
                    console.log(`🌾 SawitDB: Menyalin data awal ke lahan sementara (${this.dbPath})...`);
                    fs.copyFileSync(this.initialDbPath, this.dbPath);
                } catch (err) {
                    console.error('⚠️ SawitDB: Gagal menyalin data awal:', err);
                }
            }
        } else {
            this.dbPath = dbPath;
        }
        this.data = {};
        this.load();
    }

    load() {
        try {
            if (fs.existsSync(this.dbPath)) {
                const content = fs.readFileSync(this.dbPath, 'utf-8');
                this.data = JSON.parse(content);
                console.log('🌾 SawitDB: Data berhasil dipanen dari ladang');
            } else {
                this.data = {};
                this.save();
                console.log('🌱 SawitDB: Ladang baru dibuka');
            }
        } catch (error) {
            console.log('⚠️ SawitDB: Gagal membaca ladang, menggunakan memori...');
            this.data = {};
            // Don't try to save in this case
        }
    }

    save() {
        try {
            fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
        } catch (error) {
            // Silently fail in serverless - data stays in memory
            console.log('⚠️ SawitDB: Data hanya tersimpan di memori (serverless mode)');
        }
    }

    async run(query) {
        // Add artificial delay to simulate slow government servers
        await this.delay(500);

        console.log('🚜 SawitDB: Memproses query pertanian...');

        const trimmedQuery = query.trim();

        // LAHAN [table] - Create table
        const lahanMatch = trimmedQuery.match(/^LAHAN\s+(\w+)$/i);
        if (lahanMatch) {
            const tableName = lahanMatch[1];
            if (!this.data[tableName]) {
                this.data[tableName] = [];
                this.save();
                console.log(`🌱 LAHAN: Ladang "${tableName}" berhasil dibuka`);
            }
            return { success: true, message: `Ladang ${tableName} siap ditanami` };
        }

        // TANAM KE [table] BIBIT (key1: val1, key2: val2, ...)
        const tanamMatch = trimmedQuery.match(/^TANAM\s+KE\s+(\w+)\s+BIBIT\s*\((.+)\)$/i);
        if (tanamMatch) {
            const tableName = tanamMatch[1];
            const bibitStr = tanamMatch[2];

            if (!this.data[tableName]) {
                this.data[tableName] = [];
            }

            // Parse bibit string into object
            const record = {};
            const pairs = bibitStr.split(',').map(p => p.trim());

            for (const pair of pairs) {
                const colonIndex = pair.indexOf(':');
                if (colonIndex > -1) {
                    const key = pair.substring(0, colonIndex).trim();
                    let value = pair.substring(colonIndex + 1).trim();
                    // Remove quotes if present
                    value = value.replace(/^['"]|['"]$/g, '');
                    record[key] = value;
                }
            }

            record.created_at = new Date().toISOString();
            record.updated_at = new Date().toISOString();

            this.data[tableName].push(record);
            this.save();
            console.log(`🌾 TANAM: Bibit berhasil ditanam di ladang "${tableName}"`);
            return { success: true, data: record };
        }

        // PANEN DARI [table] DIMANA [key]=[value]
        const panenDimanaMatch = trimmedQuery.match(/^PANEN\s+DARI\s+(\w+)\s+DIMANA\s+(\w+)\s*=\s*(.+)$/i);
        if (panenDimanaMatch) {
            const tableName = panenDimanaMatch[1];
            const key = panenDimanaMatch[2];
            let value = panenDimanaMatch[3].trim().replace(/^['"]|['"]$/g, '');

            if (!this.data[tableName]) {
                console.log(`❌ PANEN: Ladang "${tableName}" tidak ditemukan`);
                return { success: false, data: [] };
            }

            const results = this.data[tableName].filter(item => String(item[key]) === String(value));
            console.log(`🌾 PANEN: ${results.length} hasil panen dari ladang "${tableName}"`);
            return { success: true, data: results };
        }

        // PANEN DARI [table] - Select all
        const panenMatch = trimmedQuery.match(/^PANEN\s+DARI\s+(\w+)$/i);
        if (panenMatch) {
            const tableName = panenMatch[1];

            if (!this.data[tableName]) {
                console.log(`❌ PANEN: Ladang "${tableName}" tidak ditemukan`);
                return { success: false, data: [] };
            }

            console.log(`🌾 PANEN: ${this.data[tableName].length} hasil panen dari ladang "${tableName}"`);
            return { success: true, data: this.data[tableName] };
        }

        // GUSUR DARI [table] - Delete all
        const gusurMatch = trimmedQuery.match(/^GUSUR\s+DARI\s+(\w+)$/i);
        if (gusurMatch) {
            const tableName = gusurMatch[1];

            if (this.data[tableName]) {
                const count = this.data[tableName].length;
                this.data[tableName] = [];
                this.save();
                console.log(`🚜 GUSUR: ${count} tanaman digusur dari ladang "${tableName}"`);
                return { success: true, message: `${count} data digusur` };
            }
            return { success: false, message: 'Ladang tidak ditemukan' };
        }

        // PUPUK [table] - Randomly corrupt data (Easter egg)
        const pupukMatch = trimmedQuery.match(/^PUPUK\s+(\w+)$/i);
        if (pupukMatch) {
            const tableName = pupukMatch[1];

            if (this.data[tableName] && this.data[tableName].length > 0) {
                const corruptionTargets = ['nama', 'status', 'warna_rumah'];
                const corruptionValues = ['RUSAK', '???', 'ERROR', 'NULL', 'undefined', '🤡'];

                let corruptedCount = 0;
                this.data[tableName].forEach(record => {
                    if (Math.random() < 0.1) { // 10% chance
                        const targetKey = corruptionTargets[Math.floor(Math.random() * corruptionTargets.length)];
                        if (record[targetKey]) {
                            record[targetKey] = corruptionValues[Math.floor(Math.random() * corruptionValues.length)];
                            record.updated_at = new Date().toISOString();
                            corruptedCount++;
                        }
                    }
                });

                this.save();
                console.log(`☠️ PUPUK: ${corruptedCount} data tercemar di ladang "${tableName}"`);
                return { success: true, message: `${corruptedCount} data terkorupsi`, corrupted: corruptedCount };
            }
            return { success: false, message: 'Ladang kosong' };
        }

        console.log('❓ SawitDB: Query tidak dikenali');
        return { success: false, message: 'Query tidak valid' };
    }

    // Direct methods for easier use
    async insert(table, data) {
        if (!this.data[table]) {
            this.data[table] = [];
        }

        const record = {
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        this.data[table].push(record);
        this.save();
        return record;
    }

    async findAll(table) {
        return this.data[table] || [];
    }

    async findOne(table, key, value) {
        if (!this.data[table]) return null;
        return this.data[table].find(item => String(item[key]) === String(value)) || null;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = SawitDB;
