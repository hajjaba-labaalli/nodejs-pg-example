# Utilisation Debian 12 comme image de base
FROM debian:latest

# Mettre à jour les paquets et installer Node.js et npm
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Définition du répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY ["package.json", "package-lock.json", "./"]

# Installation des dépendances de la production seulement
RUN npm ci --only=production

# Exécution des conteneurs en tant qu'utilisateur non privilégié (node) plutôt qu'en tant que root
#RUN useradd -ms /bin/bash node
#USER node

# Copier le reste des fichiers de l'application dans le conteneur
#COPY --chown=node:node . .

# Définir le port sur lequel le conteneur écoute
EXPOSE 5000

# Commande pour démarrer l'application Node.js
CMD ["node", "index.js"]
