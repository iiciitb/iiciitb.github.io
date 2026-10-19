# IIC IIT Bombay — static site Docker image
# Serves the site via nginx on port 80.

FROM nginx:1.27-alpine

# nginx hardening: hide version, set security headers, gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy site contents
COPY . /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/README.md \
          /usr/share/nginx/html/SECURITY.md \
          /usr/share/nginx/html/SUPABASE_SETUP.md \
          /usr/share/nginx/html/.dockerignore \
          /usr/share/nginx/html/.gitignore

# drop privileges where possible
USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
