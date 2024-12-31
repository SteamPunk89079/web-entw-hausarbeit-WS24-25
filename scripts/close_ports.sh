#!/bin/bash

echo "Searching for processes started with 'npm run start <port_nr>'..."
# Find matching processes, extract PIDs, and kill them
ps aux | grep -E "npm run start" | grep -v grep | awk '{print $2}' | while read -r pid; do
    echo "Killing process with PID: $pid"
    kill -9 "$pid" 2>/dev/null && echo "Successfully killed process $pid" || echo "Failed to kill process $pid"
done

echo "All processes matching 'npm run start <port_nr>' have been cleared."