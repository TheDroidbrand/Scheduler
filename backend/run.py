import uvicorn
import os
import sys

# Add the parent directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

if __name__ == "__main__":
    print("Starting FastAPI server...")
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
