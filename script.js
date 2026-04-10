// Gestion du panier
let panier = [];
let total = 0;

// Fonction pour commander directement un produit via WhatsApp
function commanderProduit(nomProduit, prix) {
  const message = `Bonjour Adorachou Boutiqique !\n\nJe souhaite commander :\n1x ${nomProduit} - ${prix} FCFA\n\nMerci !`;

  // Ouvrir WhatsApp avec le message
  const whatsappUrl = `https://wa.me/2250153835152?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');

  afficherNotification(`Commande de ${nomProduit} envoyée via WhatsApp !`, 'success');
}

// Fonction pour ajouter au panier
function ajouterAuPanier(nomProduit, prix) {
  // Vérifier si le produit est déjà dans le panier
  const produitExistant = panier.find(item => item.nom === nomProduit);

  if (produitExistant) {
    produitExistant.quantite += 1;
  } else {
    panier.push({
      nom: nomProduit,
      prix: prix,
      quantite: 1
    });
  }

  mettreAJourPanier();
  afficherNotification(`${nomProduit} ajouté au panier !`, 'success');
}

// Fonction pour supprimer du panier
function supprimerDuPanier(index) {
  panier.splice(index, 1);
  mettreAJourPanier();
}

// Fonction pour mettre à jour l'affichage du panier
function mettreAJourPanier() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (panier.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
    cartTotal.textContent = '0 FCFA';
    checkoutBtn.disabled = true;
    return;
  }

  let html = '';
  total = 0;

  panier.forEach((item, index) => {
    const sousTotal = item.prix * item.quantite;
    total += sousTotal;

    html += `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.nom}</div>
          <div class="cart-item-price">${item.prix} FCFA x ${item.quantite} = ${sousTotal} FCFA</div>
        </div>
        <button class="cart-item-remove" onclick="supprimerDuPanier(${index})">Supprimer</button>
      </div>
    `;
  });

  cartItems.innerHTML = html;
  cartTotal.textContent = total.toLocaleString() + ' FCFA';
  checkoutBtn.disabled = false;
}

// Fonction pour afficher les notifications
function afficherNotification(message, type = 'info') {
  // Créer l'élément de notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Ajouter les styles de base pour la notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : '#f97316'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
  `;

  // Ajouter l'animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Ajouter au DOM
  document.body.appendChild(notification);

  // Supprimer après 3 secondes
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Fonction de commande
function commander() {
  if (panier.length === 0) {
    afficherNotification('Votre panier est vide', 'error');
    return;
  }

  const message = panier.map(item =>
    `${item.quantite}x ${item.nom} - ${item.prix * item.quantite} FCFA`
  ).join('\n');

  const messageComplet = `Bonjour Adorachou Boutiqique !\n\nJe souhaite commander :\n${message}\n\nTotal : ${total} FCFA\n\nMerci !`;

  // Ouvrir WhatsApp avec le message
  const whatsappUrl = `https://wa.me/2250153835152?text=${encodeURIComponent(messageComplet)}`;
  window.open(whatsappUrl, '_blank');

  afficherNotification('Commande envoyée via WhatsApp !', 'success');
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  // Ajouter des écouteurs d'événements aux boutons "Ajouter au panier"
  const boutons = document.querySelectorAll('.product-card .price');

  boutons.forEach((prixElement, index) => {
    const card = prixElement.closest('.product-card');
    const nomProduit = card.querySelector('h3').textContent;
    const prixText = prixElement.textContent;
    const prix = parseInt(prixText.replace(/[^\d]/g, ''));

    // Créer et ajouter les boutons
    const boutonsContainer = document.createElement('div');
    boutonsContainer.className = 'product-buttons';

    // Bouton "Ajouter au panier"
    const boutonPanier = document.createElement('button');
    boutonPanier.className = 'btn btn-secondary';
    boutonPanier.textContent = 'Ajouter au panier';
    boutonPanier.onclick = () => ajouterAuPanier(nomProduit, prix);

    // Bouton "Commander"
    const boutonCommander = document.createElement('button');
    boutonCommander.className = 'btn btn-primary';
    boutonCommander.textContent = 'Commander';
    boutonCommander.onclick = () => commanderProduit(nomProduit, prix);

    // Ajouter les boutons au conteneur
    boutonsContainer.appendChild(boutonPanier);
    boutonsContainer.appendChild(boutonCommander);

    // Ajouter après le prix
    prixElement.parentNode.insertBefore(boutonsContainer, prixElement.nextSibling);
  });

  // Écouteur pour le bouton de commande
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', commander);
  }

  // Mettre à jour le panier au chargement
  mettreAJourPanier();
});