FROM node:12.17.0-slim AS builder

RUN yarn config set registry https://registry.npmmirror.com/

WORKDIR /workspace
COPY ./next-app/package.json .
COPY ./next-app/.yarnrc .
COPY ./next-app/yarn.lock .
RUN yarn install --frozen-lockfile

COPY ./next-app /workspace/next-one
WORKDIR /workspace/next-one
ENV PLATFORM=one
RUN /workspace/node_modules/.bin/next build

COPY ./next-app /workspace/next-two
WORKDIR /workspace/next-two
ENV PLATFORM=two
RUN node /workspace/node_modules/.bin/next build

EXPOSE 3000
EXPOSE 3001

COPY ./next-app/scripts/docker-start.sh /

CMD ["/bin/sh", "/docker-start.sh"]
