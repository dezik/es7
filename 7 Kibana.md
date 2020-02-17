## Install Kibana
1. Install Kibana: 
    `sudo apt-get install kibana`
2. Update settigs `/etc/kibana/kibana.yml` by changing `server.host 0.0.0.0`
3. Start kibana service:
    `sudo systemctl daemon-reload`
    `sudo systemctl enable kibana.service`
    `sudo systemctl start kibana.service`
4. Kibana is available on `127.0.0.1:5601`

## Play with Kibana
1. Management->Kibana->Index pattern->Create new
2. Set index pattern to 'shakespeare' -> Next step -> Create index pattern
3. Switch to Discover mode by clicking on Discover button in right side menu
4. You can search here and find some metrics and visualisation by fields in left panel
5. Visualize tab -> Create new visualisation -> Select index pattern
6. PLay with different types of visualisation
7. Open DevTools tab-> You can practice your queries here