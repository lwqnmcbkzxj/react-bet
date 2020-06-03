//
//  SettingsViewController.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 04.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import UIKit

class SettingsViewController: UIViewController {
    
    private lazy var settingsView = SettingsView()
    
    var presenter: ISettingsPresenter! {
        didSet {
            guard let presenter = presenter else { return }
            presenter.dataChanged = { (info) in
                self.settingsView.profileImageView.setImage(url: info.forecaster.avatar)
            }
        }
    }
    
    override func loadView() {
        super.loadView()
        view.backgroundColor = .white
        addBackView(text: nil)
        setView(settingsView)
       
        
        let gesture = UITapGestureRecognizer(target: self,
                                             action: #selector(profileImageTapped))
        settingsView.profileImageView.addGestureRecognizer(gesture)
        
        settingsView.exitButton.addTarget(self, action: #selector(exitTapped), for: .touchUpInside)
        
    }
    
    func configure(userInfo: UserInfo) {
        settingsView.configure(with: userInfo)
    }
    
    private func attachTapped(network: SocialNetwork) {
         
    }
    
    private func deattachTapped(network: SocialNetwork) {
        
    }
    
    @objc private func exitTapped() {
        presenter.logOut()
    }
    
    @objc private func profileImageTapped() {
        
        let picker = UIImagePickerController()
        picker.sourceType = .photoLibrary
        picker.allowsEditing = true
        picker.delegate = self
        
        present(picker, animated: true, completion: nil)
    }
}

extension SettingsViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        guard let image = info[.editedImage] as? UIImage else {
            return
        }
        
        presenter.uploadAvatar(image)
        picker.dismiss(animated: true, completion: nil)
    }
}
