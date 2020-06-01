//
//  CreateForecastHeaderPresenter.swift
//  BettingHub
//
//  Created by Maxim Bezdenezhnykh on 29.05.2020.
//  Copyright © 2020 Maxim Bezdenezhnykh. All rights reserved.
//

import Foundation
import UIKit

protocol ICreateForecastHeaderPresenter: class {
    
    var bookmakers: Observable<[Bookmaker]> { get }
    var sportKinds: Observable<[Sport]> { get }
    var championships: Observable<[Championship]> { get }
    var matches: Observable<[Match]> { get }
    
    var selectedBookmaker: Bookmaker? { get set }
    var selectedSport: Sport? { get set }
    var selectedChampionship: Championship? { get set }
    var selectedMatch: Match? { get set }
    
    func canEdit(_ field: CreateForecastField) -> Bool
    
    func fieldDataChanged(_ field: CreateForecastField)
    
    func manageTextField(_ textField: UITextField, as field: CreateForecastField)
    
    func showLoading(_ isLoading: Bool, for field: CreateForecastField)
}

class CreateForecastHeaderPresenter: ICreateForecastHeaderPresenter {
    
    @ModuleDependency(assembly: CreateForecastAssembly.shared)
    private var interactor: ICreateForecastHeaderInteractor
    
    @ModuleDependency(assembly: CreateForecastAssembly.shared)
    private var mainPresenter: ICreateForecastPresenter
    
    private var managers: [CreateForecastFieldManager] = []
    
    var bookmakers = Observable<[Bookmaker]>([])
    
    var sportKinds = Observable<[Sport]>([])
    
    var championships = Observable<[Championship]>([])
    
    var matches = Observable<[Match]>([])
    
    var selectedBookmaker: Bookmaker? {
        didSet { mainPresenter.bookmaker = selectedBookmaker }
    }
    
    var selectedSport: Sport?
    
    var selectedChampionship: Championship?
    
    var selectedMatch: Match? {
        didSet { mainPresenter.match = selectedMatch }
    }
    
    func canEdit(_ field: CreateForecastField) -> Bool {
        switch field {
        case .matchSearch, .bookmaker: return true
            
        case .sportKind:
            return !text(at: .bookmaker).isEmpty
            
        case .championship:
            return !text(at: .sportKind).isEmpty
            
        case .match:
            return !text(at: .championship).isEmpty
            
        case .date, .time: return false
        }
    }
    
    func fieldDataChanged(_ field: CreateForecastField) {
        clearAll(after: field)
        if field != .match {
            mainPresenter.match = nil
        }
    }
    
    func load(for field: CreateForecastField) {
        switch field {
        case .matchSearch: searchMatch()
        case .bookmaker: selectBookmaker()
        case .sportKind: selectSportKind()
        case .championship: selectChampionship()
        case .match: selectMatch()
        default: break
        }
    }
    
    func manageTextField(_ textField: UITextField, as field: CreateForecastField) {
        let manager = CreateForecastFieldManager(field: field)
        manager.attach(textField: textField)
        manager.textFieldEditable = { [weak self] in self?.canEdit(field) ?? false }
        manager.dataChanged = { [weak self] (field) in
            guard let this = self else { return }
            this.fieldDataChanged(field)
        }
        manager.editingStart = { [weak self] (field) in
            guard let this = self else { return }
            this.load(for: field)
        }
        managers.append(manager)
    }
    
    func showLoading(_ isLoading: Bool, for field: CreateForecastField) {
        manager(for: field)?.showLoading(isLoading)
    }
}

private extension CreateForecastHeaderPresenter {
    
    var fieldsQueue: [CreateForecastFieldManager] {
        [
            manager(for: .bookmaker),
            manager(for: .sportKind),
            manager(for: .championship),
            manager(for: .match)
        ].compactMap { $0 }
    }
    
    func clearAll(after field: CreateForecastField) {
        if let index = fieldsQueue.firstIndex(where: {$0.field == field}),
        fieldsQueue.count > index + 1 {
            fieldsQueue[(index + 1)..<fieldsQueue.count].forEach { (manager) in
                manager.setText(text: "")
            }
        }
    }
    
    func manager(for field: CreateForecastField) -> CreateForecastFieldManager? {
        return managers.first(where: {$0.field == field})
    }
    
    func text(at field: CreateForecastField) -> String {
        manager(for: field)?.text ?? ""
    }
    
    func setText(_ text: String, for field: CreateForecastField) {
        manager(for: field)?.setText(text: text)
    }
    
    func searchMatch() {
        
    }
    
    func selectBookmaker() {
        showLoading(true, for: .bookmaker)
        interactor.loadBookmakers { [weak self] (bookmakers) in
            guard let bookmakers = bookmakers else { return }
            self?.bookmakers.data = bookmakers
            self?.showLoading(false, for: .bookmaker)
        }
    }
    
    func selectSportKind() {
        guard let bookmaker = selectedBookmaker else { return }
        showLoading(true, for: .sportKind)
        interactor.loadSports(bookmaker: bookmaker) { (sports) in
            guard let sports = sports else { return }
            self.sportKinds.data = sports
            self.showLoading(false, for: .sportKind)
        }
    }
    
    func selectChampionship() {
        guard let bookmaker = selectedBookmaker,
            let sport = selectedSport else { return }
        showLoading(true, for: .championship)
        interactor.loadChampionships(bookmaker: bookmaker,
                                     sport: sport)
        { (championships) in
            guard let championships = championships else { return }
            self.championships.data = championships
            self.showLoading(false, for: .championship)
        }
    }
    
    func selectMatch() {
        guard let bookmaker = selectedBookmaker,
            let sport = selectedSport,
            let championship = selectedChampionship else { return }
        showLoading(true, for: .match)
        interactor.loadMatches(bookmaker: bookmaker,
                               sport: sport,
                               championship: championship)
        { (matches) in
            guard let matches = matches else { return }
            self.matches.data = matches
            self.showLoading(false, for: .match)
        }
    }
}
