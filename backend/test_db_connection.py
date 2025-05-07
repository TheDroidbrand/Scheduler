import os
import sys
from dotenv import load_dotenv
from sqlalchemy import text

# Add the parent directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load environment variables
load_dotenv()

try:
    from backend.database import engine, Base
    from backend import models
except ImportError:
    # Try without the 'backend' prefix if running from within the backend directory
    from database import engine, Base
    import models

def test_connection():
    print("Testing database connection...")
    
    try:
        # First, try a simple query to check connection
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print("✅ Basic connection test successful!")
        
        # Then try to create tables
        print("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        print("✅ Successfully created database tables!")
        
        # List the tables that were created
        print("\nCreated tables:")
        for table in Base.metadata.sorted_tables:
            print(f"  - {table.name}")
            
        return True
    except Exception as e:
        print(f"❌ Database connection error: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_connection()
    if success:
        print("\n🎉 Your database connection is properly configured!")
    else:
        print("\n❌ Failed to connect to the database. Please check your connection string and network settings.")
