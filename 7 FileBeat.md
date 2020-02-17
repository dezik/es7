## Install FileBeat
1. Install FileBeat:
    `sudo apt-get update && sudo apt-get install filebeat`
2. Restart es service:
    `sudo systemctl stop elasticsearch.service`
    `sudo systemctl start elasticsearch.service`
3. Copy access_log file to /home/student/logs folder
4. Enable apache.yml configuration:
    `cd /etc/filebeat/modules.d`
    `sudo mv apache.yml.disabled apache.yml`
5. Add paths to apache.yml:
    `var.paths: ["/home/student/logs/access*", "/home/student/logs/error*"]`
6. Start filebeat:
    `sudo systemctl start filebeat.service`

## Analyze logs with Kibana
1. Install Kibana dashboards:
    `cd /usr/share/filebeat/bin/`
    `sudo filebeat setup --dashboards`
2. Restart kibana:
    `sudo systemctl restart kibana.service`
3. Check if new index pattern with name `filebeat-*` was added to kibana (Management->Kibana->Index Patterns)
4. Check new dashboard `[Filebeat Apache] Access and error logs ECS` on Dashboard tab