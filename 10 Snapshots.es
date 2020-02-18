// ================================================
//      Creating Snapshots
// ================================================

// Configure ES where to put the snapshot
//    sudo vim /etc/elasticsearch/elasticsearch.yml
// Add line:
//    path.repo: ["/home/username/backups"]
// Restart Elasticsearch:
//    sudo systemctl restart elasticsearch
// Create folder "/home/username/backups"

// Configure backup repository:
PUT /_snapshot/backup-repo
{
  "type": "fs",
  "settings": {
    "location": "/home/username/backups/backup-repo"
  }
}

// Create snapshot:
PUT /_snapshot/backup-repo/snapshot-1

// Get snapshot status:
GET /_snapshot/backup-repo/snapshot-1
GET /_snapshot/backup-repo/snapshot-1/_status



// =================================================================
//      Restoring from backup
// =================================================================
// Close or freeze all indexes in ES before restoring from backup:
POST /_all/_close

// Restore from created snapshot
POST /_snapshot/backup-repo/snapshot-1/_restore

GET /movies/_search

// =================================================================
// All these operations can be done in Kibana GUI -> Management -> Elasticsearch -> Snapshot and Restore