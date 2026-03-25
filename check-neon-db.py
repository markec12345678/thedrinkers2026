"""
Check Neon Database Status
"""
import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

print("🔍 Connecting to Neon Database...\n")
print(f"Database URL: {DATABASE_URL[:50]}...")

try:
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    print("✅ Connected successfully!\n")
    
    # Get all tables
    cur.execute("""
        SELECT table_schema, table_name 
        FROM information_schema.tables 
        WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
        ORDER BY table_schema, table_name
    """)
    
    tables = cur.fetchall()
    
    print(f"📊 Found {len(tables)} tables:\n")
    
    current_schema = None
    for schema, table in tables:
        if schema != current_schema:
            print(f"\n{schema}:")
            print("─" * 40)
            current_schema = schema
        print(f"  - {table}")
    
    # Check specific tables we need
    print("\n\n🎯 The Drinkers Tables:")
    print("═" * 50)
    
    needed_tables = [
        'user', 'account', 'session', 'verification',
        'mcp_server', 'thread', 'message',
        'product', 'order', 'order_item',
        'tour_date', 'album', 'song',
        'fan_art', 'fan_art_like',
        'vip_membership', 'vip_tier',
        'user_reward', 'user_points', 'points_transaction'
    ]
    
    for table in needed_tables:
        cur.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = %s
            )
        """, (table,))
        
        exists = cur.fetchone()[0]
        status = "✅" if exists else "❌"
        print(f"{status} {table}")
    
    cur.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
