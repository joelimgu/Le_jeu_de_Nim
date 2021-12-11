# Projet 2A-MIC : Jeu de Nim
# Saad Ben Salah Mongi
# Vouters Sébastien

import random

def somme_xor(liste) :
    """
    Renvoie la somme des éléments de la liste en utilisant la somme de nim (xor) comme addition
    """
    if len(liste)==0 : return 0
    if len(liste)==1 : return liste[0]
    return liste[0]^somme_xor(liste[1:])

def position_paire(liste) :
    """
    Vérifie la parité du résultat du xor de la liste
    """
    return somme_xor(liste)==0

def init_liste () :
    """
    Initialise la liste pour le jeu : un élément pour une ligne et chaque élément donne le nombre d'allumettes pour cette ligne
    """
    reponse="0"
    liste=[]
    while reponse:
        #On lit l'input tant qu'on tape pas sur entrer directement
        reponse=input("Donner le nombre d'allumettes de la ligne n°{} :".format(len(liste)))
        #on vérifie que l'input est bien un nombre
        if reponse.isdigit() and int(reponse) > 0:
            liste.append(int(reponse))
    return liste

def affichage(liste) :
    """
    Affiche la liste avec des batons
    """
    i=0
    while i<len(liste) :
        print("\n") 
        for k in range(liste[i]) :
            print(" |", end='')
        i+=1
    print("\n")

def jouer_hasard(liste) :
    """
    Tour de jeu au hasard de l'ordinateur si celui-ci est en position défavorable
    """
    ligne = random.randint(0,len(liste)-1)
    while liste[ligne]==0 :
        ligne = random.randint(0,len(liste)-1)
    nombre_a_enlever = random.randint(1,liste[ligne])
    liste[ligne]=liste[ligne]-int(nombre_a_enlever)
    print("L'ordinateur a enlevé au hasard {} allumettes à la ligne {}".format(nombre_a_enlever,ligne))

def jouer_strategie(liste) :
    """
    Tour de jeu stratégique de l'ordinateur si celui-ci est en position défavorable
    """
    trouve = False
    l=0
    while l < len(liste) and not(trouve) :
        recup=liste[l]
        nb = 1
        while nb <= liste[l] :
            liste[l]=recup-nb
            if position_paire(liste) and not(trouve) :
                trouve = True
                ligne = l
                nombre_a_enlever = nb
            liste[l] = recup
            nb = nb + 1
        l = l + 1
    if trouve :
        liste[ligne]=liste[ligne]-nombre_a_enlever
        print("L'ordinateur a enlevé stratégiquement boucle {} allumettes à la ligne {}".format(nombre_a_enlever,ligne))
    else :
        print("Erreur, pas de position trouvée")

def liste_max(liste) :
    ligne_max=0
    i=0
    while i < len(liste):
        if liste[i] > liste[ligne_max] :
            ligne_max=i
        i=i+1
    return ligne_max

def copier(liste) :
    liste_cop = []
    i=0
    while i < len(liste):
        liste_cop.append(liste[i])
        i=i+1
    return liste_cop

def jouer_strategie_max(liste) :
    somme=somme_xor(liste)
    liste_mod=copier(liste)
    l=liste_max(liste_mod)
    trouve=False

    if somme < liste[l] :
        while not(trouve) and liste_mod[l]!=0 :
            recup=liste[l]
            liste[l]=liste[l]-somme
            if position_paire(liste) :
                trouve=True
                print(liste)
            else :
                liste[l]=recup
                liste_mod[l]=0
                l=liste_max(liste_mod)
        print("L'ordinateur a enlevé stratégiquement max {} allumettes à la ligne {}".format(somme,l))
    else :
        jouer_strategie(liste)
    

def tour_ordinateur(liste) :
    """
    Ordinateur joue au hasard s'il est en position défavorable ou joue stratégiquement s'il est en position favorable puis on vérifie si l'ordinateur a perdu
    """
    global fin_du_jeu
    
    print("\nC'est au tour de l'ordinateur")
    if position_paire(liste) :
        jouer_hasard(liste)
    else :
        jouer_strategie(liste)

    affichage(liste)

    liste_nulle=True

    l = 0
    
    while l < len(liste) and liste_nulle:
        if liste[l] != 0 :
            liste_nulle = False
        l = l + 1
    if liste_nulle :
        fin_du_jeu = True
        print("L'ordinateur a gagné") 
    
def tour_joueur(liste) :
    """
    Demande au joueur de choisir la ligne et le nombre d'allumettes à enlever puis vérifie si le joueur n'a pas perdu
    """
    global fin_du_jeu
    
    print("\nC'est au tour du joueur")
    correct = False
    while not(correct) :
        ligne=input("Choisir une ligne entre 0 et {} :".format(len(liste)-1))
        if ligne.isdigit() and 0<=int(ligne)<len(liste):
            ligne=int(ligne)
            nombre_a_enlever=input("Choisir le nombre d'allumettes à enlever entre 1 et {} :".format(liste[int(ligne)]))
            if nombre_a_enlever.isdigit() and 1<=int(nombre_a_enlever)<=liste[ligne]:
                correct = True
            else :
                print("nombre à enlever incorrect, recommencer")                
    liste[ligne]=liste[ligne]-int(nombre_a_enlever)

    affichage(liste)

    liste_nulle=True
    
    l = 0
    
    while l < len(liste) and liste_nulle:
        if liste[l] != 0 :
            liste_nulle = False
        l = l + 1
    if liste_nulle :
        fin_du_jeu = True
        print("Le joueur a gagné")

def jeu_de_nim () :
    
    liste_jeu=init_liste()
    affichage(liste_jeu)
    correct = False
    while not(correct) :
        debut=input("\nLe joueur commence ? o/n")
        if debut=='o' or debut=='n' :
            correct=True
        else :
            print("Répondre par 'o' pour oui ou 'n' pour non")

    global fin_du_jeu
    fin_du_jeu = False
    
    if debut=='o' :
        while not(fin_du_jeu) :
            tour_joueur(liste_jeu)
            if not(fin_du_jeu) :
                tour_ordinateur(liste_jeu)
        print("\nFin du Jeu")
    else :
        while not(fin_du_jeu) :
            tour_ordinateur(liste_jeu)
            if not(fin_du_jeu) :
                tour_joueur(liste_jeu)
        print("\nFin du Jeu")

jeu_de_nim ()
